import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BaseUrl } from '../../../BaseUrl';
import { AuthService } from '../../Services/auth.service';
import { BaseApiService } from '../../Services/base-api.service';
import { ImageUploadService } from '../../Services/image-upload-service.service';
import { ChatMessages, ChatModel, MessageRespone, SignalList, UserDetail } from '../../Models/Authentication/UserModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../Services/message.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-dicussion-chat-assitance',
  templateUrl: './dicussion-chat-assitance.component.html',
  styleUrl: './dicussion-chat-assitance.component.css'
})
export class DicussionChatAssitanceComponent implements OnInit {
  chatForm!: FormGroup;
  private connection: HubConnection;
  public messages: ChatModel[] = [];
  public userId: string = "";
  public message: string = "";
  loading: boolean = false;
  editorContent: string = "";
  itemId!: string
  user!: UserDetail
  notifications: MessageRespone[] = [];
  messagesent!: MessageRespone
  role!: string
  baseApi:string=BaseUrl;
  selectedSignalType: string = '';
  imageUrl!:string
  sidebarVisible: boolean = false;
  sidebarVisible1: boolean = false;
  signalLists:SignalList[]=[]


  constructor(
    private auth: AuthService,
    private api: BaseApiService,
    private ImageService: ImageUploadService,
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private messageService:MessageService,
    private datePipe: DatePipe
  )
  {
    this.userId = this.auth.getUID();
    this.role   = this.auth.getRoles().toString();
    this.connection = new HubConnectionBuilder()
      .withUrl(`${this.baseApi}/chat`)
      .build();
  }

  getBackgroundColor(signalType: string): string
  {
    switch (signalType) {
      case 'Vol':
        return '#FF3131';
      case 'Agression':
        return '#FF7B31'; // Example color for Agression
      case 'suspect':
        return '#FFC52F'; // Example color for Suspect
      case 'Agression Sexuel':
        return '#9747FF'; // Example color for Agression Sexuel
      default:
        return '#9747FF'; // Default color
    }
  }

  setSignalType(type:string)
  {
    this.selectedSignalType = type;
    this.sidebarVisible1=true;
    this.getSinals(this.selectedSignalType)
  }

  InitlizeForm(){
  this.loading=true
  this.chatForm = this.fb.group({
    senderId: [''],
    message: ['', [Validators.required, Validators.minLength(1)]],
    receiverId: [''],
    image: [''],
    attachmentId: [''],
    groupType: ['']
  });
  this.loading=false
  }

  private getChats(type:string) {
    this.loading = true;
    this.api.read(`Chat/GetChat?type=${type}`).subscribe
      (
        (response) => {
          this.notifications = response;
          this.loading       = false;
        }
        , (
          error
        ) => {
          this.loading = false;

        }
      )
  }
  private getSinals(signalType:string) {
    this.loading = true;
    this.api.read(`Singal/GetSignalClients?userId=${this.userId}&signalType=${signalType}`).subscribe
      (
        (response) => {
          this.signalLists = response;
          this.loading     = false;
        }
        , (
          error
        ) => {
          this.loading = false;

        }
      )
  }

   shouldDisplayDate(index: number): boolean {
    if (index === 0) {
      return true;
    }
    const currentItemDate   = this.datePipe.transform(this.notifications[index].timestamp, 'yyyy-MM-dd');
    const previousItemDate  = this.datePipe.transform(this.notifications[index - 1].timestamp, 'yyyy-MM-dd');
    return currentItemDate !== previousItemDate;
  }

  // Function to format the date
  getFormattedDate(timestamp: string): string {
    return this.datePipe.transform(timestamp, 'fullDate') || "";
  }

  // Function to format the time
  getFormattedTime(timestamp: string): string {
    return this.datePipe.transform(timestamp, 'shortTime') || "";
  }

  async ngOnInit()
  {
    this.InitlizeForm();
    await this.startSignalRConnection();
    this.route.params.subscribe(params => {
      this.loading=true
      this.itemId = params['ChatType'];
      this.getChats(this.itemId);
      this.chatForm.patchValue({
         groupType  :this.itemId,
         senderId   :this.userId,
         receiverId :this.userId
      })
      this.getSinals(this.selectedSignalType)
      this.loading=false
      this.RecieveMessages();

    });

  }






  delete(id:string,signal:string) {
    Swal.fire({
      html: `<i class="bi bi-info-circle-fill" style="font-size: 2rem; color: blue;"></i> <br>
      <small class="small-text">Do you want to delete ?</small>`,
      icon: undefined, // Disable the default icon
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No!',
      customClass: {
        popup: 'swal2-popup',
        confirmButton: 'swal2-custom-button',
        cancelButton:'swal2-custom-button1'
      },
      width: '300px'
    }).then((result) =>
    {
      if (result.isConfirmed)
      {
        this.loading=true;
        this.api.delete(`Chat?id=${id}&SignlId=${signal}`).subscribe
        (
          (response) => {

            this.loading       = false;
            this.getChats(this.itemId);
          }
          , (
            error
          ) => {
            this.loading = false;

          }
       )
      }
      else
      {


      }
    });
  }

  //Start Connection
   private async startSignalRConnection() {
    try
    {
        this.loading=true
        await this.connection.start();
        this.loading=false
    } catch (error)
    {
        console.log(error);
    }
   }

  triggerFileInput(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  onFileChange(event: Event): void {
    this.loading = true;
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
       this.ImageService.uploadImage(file).subscribe(
        (imageUrl: string) => {
          this.imageUrl = imageUrl;

          this.loading         = false;
          this.sidebarVisible  = false
          this.sidebarVisible1 = false
          Swal.fire({
            html: `<i class="bi bi-info-circle-fill" style="font-size: 2rem; color: blue;"></i> <br>
            <small class="small-text">Do you want to upload?</small>`,
            icon: undefined, // Disable the default icon
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No!',
            customClass: {
              popup: 'swal2-popup',
              confirmButton: 'swal2-custom-button',
              cancelButton:'swal2-custom-button1'
            },
            width: '300px'
          }).then((result) => {
            if (result.isConfirmed) {
              this.chatForm.patchValue({
                image:this.imageUrl,
                message:'Image shared'
              })
              this.SendMessage();
              this.imageUrl='';
            }
            else{
              this.imageUrl         ='';
              this.sidebarVisible   =true
               this.sidebarVisible1 =true
            }
          });
        },
        (error) => {
          this.loading = false;
          this.messageService.showErrorAlert(error);
        }
      );
    }
  }

  //Listen Any changes from server and fetch new
  private RecieveMessages()
  {
    this.connection.on('RecieveMessage', (allNotifications: MessageRespone) =>
    {
      this.notifications.push(allNotifications);
      this.cdr.detectChanges();
    });
  }

  async SendMessage() {
    if (this.connection.state === 'Connected')
    {
      this.loading=true
      await this.connection.invoke('SendMessage', this.chatForm.value);
      this.message="";
      this.loading=false
      this.chatForm.get('message')?.setValue('');
      this.chatForm.get('attachmentId')?.setValue('');
      this.chatForm.get('image')?.setValue('');
    } else {
      this.loading=false
      this.messageService.showErrorAlert("Connection is not  stable");
    }
  }

  customSwal(message:string,myId:string,type:string){
    this.sidebarVisible  =false
    this.sidebarVisible1 =false
    Swal.fire({
      html: `<i class="bi bi-info-circle-fill" style="font-size: 2rem; color: blue;"></i> <br>
      <small class="small-text">
        do you want to send ?
      </small>
      <br>
      <p class="p-2">${message}</p>
      `,
      icon: undefined, // Disable the default icon
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No!',
      customClass: {
        popup: 'swal2-popup',
        confirmButton: 'swal2-custom-button',
        cancelButton:'swal2-custom-button1'
      },
      width: '300px'
    }).then((result) => {

      if (result.isConfirmed) {

        this.chatForm.patchValue({
          attachmentId:myId,
          message:`${type} issue is shared`
        })
        this.SendMessage();

      }
      else{
        this.sidebarVisible=true
        this.sidebarVisible1=true
      }

    });
  }




}
