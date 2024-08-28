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
  incompleteLeads: "lead-management/get-user-lead-details",
  assinedLeadsInbox: "lead-management/get-user-lead-details/",
};

export default Endpoints;
