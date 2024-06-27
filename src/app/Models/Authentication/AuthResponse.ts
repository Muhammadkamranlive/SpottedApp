export interface AuthResponseModel {
  token: string;
  userId: string;
  message: string;
  emailStatus: boolean;
  paid:boolean;
  personal?: boolean | null;
  emergencyContact?: boolean | null;
  education?: boolean | null;
  professionalLicense?: boolean | null;
  jobExp?: boolean | null;
  dependents?: boolean | null;
  fileManager?: boolean | null;
  asset?: boolean | null;
}
