export interface User {
  email: string;
  password: string;
}

export interface Master {
  masterType: string;
  downloadStatus: boolean;
}

export enum APIMethods {
  saveAttendance = "saveAttendanceDetails",
  saveClientVisit = "save-clientvisit-detail",
}

export enum APIClassName {
  userAttendance = "userAttendanceDetails",
  leadManegment = "lead-management",
}

export enum APIURL {
  PRODURL = "https://onlineucolps.in:450/lendperfect",
}

export interface AttendanceSaveReq {
  lnUserId: string;
  lnOrgCode: string;
  lnAddressline1: string;
  lnAddressline2: string;
  lnLatitude: number;
  lnLongitude: number;
  lnCity: string;
  lnState: string;
  lnZip: string;
  lnCountry: string;
}
export interface LocationCoord {
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number | null;
}
export interface LocationAddressData {
  address1: string | null;
  address2: string | null;
  city: string | null;
  district: string | null;
  state: string | null;
  country: string | null;
  pincode: string | null;
}

export interface ClientVisitFormData {
  name: string;
  dateOfVisit: string;
  timeOfVisit: string;
  mobileNo: string;
  interestPrd: string;
  loanAmt: string;
  leadCategory: string;
  reason: string;
  remarks: string;
  latCode: string;
  longCode: string;
  address1: string | null;
  address2: string | null;
  state: string | null;
  city: string | null;
  pincode: string | null;
}

export interface ClientVisitRequest {
  cvdSeqid: string;
  cvdName: string;
  cvdMobile: string;
  cvdProduct: string;
  cvdloanAmtReq: string;
  cvdLatitude: string;
  cvdLongitude: string;
  cvdAddress1: string;
  cvdAddress2: string;
  cvdState: string;
  cvdCity: string;
  cvdPincode: string;
  cvdRemarks: string;
  cvdLocation: string;
  cvdLeadType: string;
  cvdVisitDate: string;
  cvdVisitTime: string;
  cvdCreatedBy: string;
  cvdCreatedOn: string;
  cvdModifiedBy: string;
  cvdModifiedOn: string;
}

export enum AttendancePunch {
  PUNCHIN = "Punch In",
  PUNCHOUT = "Punch Out",
}

export enum AppButtons {
  BACK = "Back",
  SUBMIT = "Submit",
  NEXT = "Next",
}

export interface PunchTypeData {
  punchType: string;
  time: string;
  date: string;
}
