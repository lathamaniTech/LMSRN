const Endpoints = {
  zonalmaster: "organisationsetup/",
  branchMaster: "organisationsetup/get-all-branches",
  lovMaster: "referece-data",
  getDocumentLovList: "lead-management/getDocumentList",
  userAttendance: "userAttendanceDetails/saveAttendanceDetails",
  applicantTypeList: "lead-management/get-application-type",
  saveClientVisit: "lead-management/save-clientvisit-detail",
  documentUpload: "origappattacheddocs/upload-lead-attachdocs",
  getDocumentList: "origappattacheddocs/read-leadAttachedDocuments",
  downloadDocument: "origappattacheddocs/download-attached-document",
  deleteDocument: "origappattacheddocs/delete",
  LeadInbox: "lead-management/get-user-lead-details",
  CompleteLeads: "CLS",
  IncompleteLeads: "INCM",
  AssignedLeads: "ATM",
};

export default Endpoints;
