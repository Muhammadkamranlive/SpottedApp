export interface UserModel{
  id:string;
  userId: number;
  dob: string;
  age: number;
  gender: string;
  race: string;
  ethnicity: string;
  nationality: string;
  photo: string;

  // Step 2: Contact Information
  homePhone: string;
  mobilePhone: string;
  carrier: string;
  personalEmail: string;
  businessEmail: string;

  // Step 3: Address Information
  address: string;
  city: string;
  state: string;
  zipCode: string;
  birthcountry:string
  country: string;

  // Step 4: Additional Information
  bestTimeToContact: string;
  howDidYouHearAboutUs: string;

  // Step 5: Professional Information
  profession: string;
  specialty: string;
  typeOfEmployment: string;
  yearsOfExperience: number;
  computerChartingSystemExperience: string;
  desiredTravelArea: string;
  locationPreference:string;
  acceptTermsAndConditions:boolean
}




export interface UserRoles {
  id: string;
  name: string;
  normalizedName: string;
  concurrencyStamp: string;
  permissions:string
}


export interface UserWithRoles {
  id: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  email: string;
  roles: string | null;
  image:string | null;
  defaultPassword:string |null
  status:string
}


export interface AllUsers {
  id: string;
  legalname: string;
  email: string;
  image:string;
  roles: string;
  batch:string;
  points:number
}

export interface AdminLogs {
  id: string;
  operationType: string;
  entityType: string;
  content: string;
  timestamp: string;

}

export interface AdminLogs {
  id: string;
  operationType: string;
  entityType: string;
  content: string;
  timestamp: string;

}

export const CaseStages: string[] = [
  'New/Submitted',
  'Assigned',
  'In Progress',
  'Waiting for Customer Response',
  'Under Review',
  'On Hold',
  'Resolved',
  'Closed',
  'Escalated',
  'Reopened',
  'Cancelled'
];



export interface CustomerCase {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  customerFirstName: string;
  customerLastName: string;
  customerEmail: string;
  customerRoles: string;
  customerId:string;
  assignedAgentId: string;
  assignedAgentFirstName: string;
  assignedAgentLastName: string;
  assignedAgentEmail: string;
  assignedAgentRoles: string;
}



export interface BoostProfile {
  id:string;
  resturantId: string;
  placement: string;
  price: number;
  forNumberOfDays: number;
  createdAt: string;
}


export interface VefiyResturant {
  id: string;
  username: string;
  resturantName: string;
  statusCode: string;
  image: string;
  email: string;
  address: string;
  frontbanner:string
}


export interface UserData {
  id: number;
  userName: string;
  email: string;
  image: string;
  title: string;
  description: string;
  boss:string
}

export interface LinkData {
  id: string;
  userId: string;
  linkType: string;
  link: string;
  linkIcon: string;
}


export interface UserDetail {
  image: string;
  legalname: string;
  surname: string;
  country: string;
  gender: string;
  socialLogin: boolean;
  addresss: string; // Note: There seems to be a typo, should it be 'address'?
  userType: string;
  postalCode: string;
  nickName: string;
  appartment: string; // Note: There seems to be a typo, should it be 'apartment'?
  city: string;
  points: number,
  batch:string,
  createdAt: string; // Consider using Date if you will handle date parsing
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string | null;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: string | null; // Consider using Date if you will handle date parsing
  lockoutEnabled: boolean;
  accessFailedCount: number;
}


export interface SignalGroup {
  title: string;
  type:string;
  longitude: number;
  latitude: number;
  count: number;
  icon:string
}


export interface ChatModel {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  role:string; // Assuming timestamp is a string for simplicity
}

export interface ChatMessages{
  id: number;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
}


export interface  SignalList{
  id: string;
  when: string;
  description: string;
  latitude: number;
  longitude: number;
  title: string;
  type: 'Vol' | 'Agression' | 'Suspect' | 'Agression Sexuel';
  legalname: string;
  userid: string;
  email: string;
  image: string;
}


export interface MessageRespone {
  id: string;
  message: string;
  imageAttachment: string;
  longitude: number;
  latitude: number;
  name: string;
  profileImage: string;
  senderId: string;
  receiverId: string;
  timestamp: string;  // ISO 8601 formatted date string
  groupType: string;
  address: string;
  when:string
  attachmentId:string;
  points:number,
  batch:string
}


export interface NotificationMessages {
  id: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  userId: string;
  workflowStep: string;
}

export interface SignalIsues{
  id: string;
  userId: string;
  title: string;
  description: string;
  type: string;
  when: string;
  longitude: number;
  latitude: number;
}


export interface InvoiceSummary {
  id: string;
  invoiceNumber: string;
  customerEmail: string;
  frequency: string;
  created: Date;
  amount: number;
}


export interface SocialLogin{
   email:string,
   password:string
}
export interface PaymentSession {
  paymentIntentId: string;
  amount: number;
  currency: string;
  created: Date;
  status: string;
  customerName: string;
  customerEmail: string;
  companyName: string;
}
