/*
@author         :   Lathamani
@since          :   12/08/2024
@description    :   lead document upload page
*/
import { Alert, Button, FlatList, KeyboardAvoidingView, ScrollView, StyleSheet, Text, Image, View, SafeAreaView, StatusBar } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { StyledDropdown } from "@/components/formcontrols";
import { Formik, FormikValues } from "formik";
import { DocumentInitValues } from "@/apptypes/AppStaticData";
import { DocumentValidationSchema } from "@/apptypes/AppValidationSchemas";
import { deleteAPIMethod, getAPIMethod, postMethod } from "@/lib/appAPIServices";
import { Endpoints } from "@/constants";
import { useCameraPermissions } from 'expo-camera';
import DocumentItem from "@/components/documentItem";
import { captureImage, convertBase64ToDataURL, openPdf, pickImage } from "@/lib/imageCapture";
import BottomSheet from "@gorhom/bottom-sheet";
import CustomBottomSheet from "@/components/customBottomSheet";
import LoadingControl from "@/components/loading";
import * as AppType from "@/apptypes/AppTypes"
import * as AppStaticMsg from "@/apptypes/AppStaticMessage"
import { useGlobalContext } from "@/context/GlobalProvider";
import { getCatchError, presentConfirmAlert, presentSimpleAlert, sortData } from "@/services/commonFunction";
import ImageModalView from "@/components/ImageModalView";

const Documents = () => {
  const [DocumentLovList, setDocumentLovList] = useState<AppType.DocumentLOVList[]>([]);
  const [applicantList, setApplicantList] = useState<AppType.ApplicantListLOV[]>([]);
  const [permission, requestPermission] = useCameraPermissions();
  const [reqData, setReqData] = useState({});
  const [applicantDocumentList, setApplicantDocumentList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { leadId } = useGlobalContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [imageBase64Data, setImageBase64Data] = useState<{ imgData: string, name: string }>();

  useEffect(() => {
    (async () => {
      getDocumentLOVListCall();
      getApplicateList();
      getDocumentDetails();
      if (!permission) {
        return <View />;
      }
      if (!permission.granted) {
        const data = await presentSimpleAlert('Alert', 'We need your permission to show the camera');
        if (data) {
          return requestPermission;
        }
      }
      bottomSheetRef.current?.close();
    })();
  }, []);

  const getDocumentLOVListCall = async () => {
    try {
      const response = await getAPIMethod(Endpoints.getDocumentLovList);
      if (response.code == AppType.ResponseStatusCode.CODE200) {
        if ('documentList' in response && response.documentList.length > 0) {
          setDocumentLovList(sortData(response.documentList, 'dmDocumentName'));
        }
      }
    } catch (error) {
      getCatchError(error, 'getDocumentLOVListCall');
    }
  }

  const getApplicateList = async () => {
    try {
      console.log(leadId, 'leadId');
      const response = await getAPIMethod(`${Endpoints.applicantTypeList}/${leadId}`,);
      if ('applicantList' in response && response.applicantList.length > 0) {
        setApplicantList(response.applicantList);
      }
    } catch (error) {
      getCatchError(error, 'getApplicateList');
    }
  }

  const getDocumentDetails = async () => {
    try {
      setApplicantDocumentList([]);
      const response = await getAPIMethod(`${Endpoints.getDocumentList}/${leadId}`);
      if (response.code == AppType.ResponseStatusCode.CODE200) {
        if ('leadAttachedDocumentList' in response && response.leadAttachedDocumentList.length > 0) {
          setApplicantDocumentList(response.leadAttachedDocumentList);
        }
      }
    } catch (error) {
      getCatchError(error, 'getDocumentDetails');
    }
  }

  const addDocument = (values: FormikValues) => {
    let checkAppIsAdded = (applicantDocumentList && applicantDocumentList.length > 0) ? applicantDocumentList.filter((item: any) => {
      return item.ladCustId == values.applicantType;
    }) : [];
    let checkDocIsAdded = checkAppIsAdded.find((item: any) => {
      return item.ladDocumentMasterId == values.docClassification;
    });
    const getApp = applicantList.find((val: any) => {
      return val.customerId == values.applicantType;
    });
    let selectedDocument = DocumentLovList.find(item => {
      return item.dmSeqId == values.docClassification;
    });
    if (checkAppIsAdded && checkDocIsAdded) {
      Alert.alert(AppStaticMsg.AlertMessage.DocumentAddedMsg);
    } else {
      setReqData({
        ladCustType: getApp ? getApp.type : '',
        ladDocClass: selectedDocument ? selectedDocument.dmDocumentName : '',
        ladDocumentMasterId: values.docClassification,
        ladCustId: values.applicantType,
      })
      openBottomSheet();
    }
  }

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  }

  const closeSheet = () => {
    bottomSheetRef.current?.close();
  }

  const takeImg = async (chooseFrom: number) => {
    if (chooseFrom == 2) {
      const result = await pickImage();
      if (result != undefined) {
        checkDocumentSizeAndProceed(reqData, result);
      }
    } else {
      const resultImg = await captureImage();
      if (resultImg != undefined) {
        checkDocumentSizeAndProceed(reqData, resultImg);
      }
    }
    bottomSheetRef.current?.close();
  }

  const checkDocumentSizeAndProceed = (doc: any, result: any) => {
    try {
      if (result.fileSize > 1258291) {
        Alert.alert(AppStaticMsg.AlertMessage.DocumentSizeMsg);
      } else {
        let docBase64Data = {
          documentName: doc.ladDocClass + '.jpg',
          document: `data:image/*;charset=utf-8;base64,${result.base64}`,
        };
        uploadImage(docBase64Data, doc);
      }
    } catch (error) {
      getCatchError(error, 'checkDocumentSizeAndProceed');
    }
  }

  const uploadImage = async (docBase64Data: any, doc: any) => {
    try {
      setIsLoading(true);
      let reqData = {
        file: docBase64Data.document,
        ladAttachedDocumentName: docBase64Data.documentName,
        ladDocumentType: 'multipart/form-data',
        ladLoanNo: leadId,
        ladDocumentAttachedId: doc.ladDocumentMasterId,
        ...doc
      };
      const resp = await postMethod(Endpoints.documentUpload, reqData);
      if (resp.code == AppType.ResponseStatusCode.CODE200) {
        setIsLoading(false);
        Alert.alert(AppStaticMsg.AlertMessage.DocumentSaved);
        getDocumentDetails();
      } else {
        setIsLoading(false);
        Alert.alert(AppStaticMsg.AlertMessage.ResponseFailed);
      }
    } catch (error) {
      setIsLoading(false);
      getCatchError(error, 'uploadImage');
    }
  }

  const viewDoc = async (doc: any) => {
    try {
      setIsLoading(true);
      let body = {
        ladLoanNo: leadId ? leadId : doc.ladLoanNo,
        ladDocumentAttachedId: doc.ladDocumentAttachedId,
        ladAttachedDocumentName: doc.ladAttachedDocumentName,
      };
      const resp = await postMethod(Endpoints.downloadDocument, body);
      if (resp.code == AppType.ResponseStatusCode.CODE200) {
        setIsLoading(false);
        if ('file' in resp && resp.file) {
          let imgData = resp.file.replace(/\r?\n|\r/g, ' ');
          let fileExtn = doc.ladAttachedDocumentName.split('.').reverse()[0];
          if (
            fileExtn == 'jpeg' || fileExtn == 'jpg' || fileExtn == 'png'
          ) {
            let imageData = {
              imgData: `data:image/${fileExtn};base64,${imgData}`,
              name: doc.ladAttachedDocumentName
            }
            setImageBase64Data(imageData);
            setModalVisible(true);
          } else {
            const result = await convertBase64ToDataURL(imgData, doc.ladAttachedDocumentName, fileExtn);
            openPdf(result);
          }
        } else {
          Alert.alert(AppStaticMsg.AlertMessage.NoImageFromServer);
        }
      } else {
        setIsLoading(false);
        Alert.alert(AppStaticMsg.AlertMessage.ResponseFailed);
      }
    } catch (error) {
      setIsLoading(false);
      getCatchError(error, 'viewDoc');
    }
  }

  const deleteDoc = async (doc: any) => {
    const data = await presentConfirmAlert(AppStaticMsg.AlertMessage.AlertTitle, AppStaticMsg.AlertMessage.DeleteAlertMsg);
    if (data == 'Yes') {
      try {
        setIsLoading(true);
        const response = await deleteAPIMethod(`${Endpoints.deleteDocument}/${doc.ladSeqId}`);
        console.info(response, 'deleter')
        if (response.code == AppType.ResponseStatusCode.CODE200) {
          presentSimpleAlert(AppStaticMsg.AlertMessage.AlertTitle, AppStaticMsg.AlertMessage.DeletedSuccessfully).then(data => {
            getDocumentDetails();
            setIsLoading(false);
          })
        } else if (response.code == AppType.ResponseStatusCode.CODE401 ||
          response.status == AppType.ResponseStatusCode.STATUSUNAUTHORIZED) {
          Alert.alert(AppStaticMsg.AlertMessage.UnAuthorizedMsg);
          setIsLoading(false);
        } else {
          Alert.alert(AppStaticMsg.AlertMessage.ResponseFailed);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        getCatchError(error, 'deleteDoc');
      }
    }
  }

  return (
    <>
      {isLoading && <LoadingControl isLoading={isLoading} />}
      <KeyboardAvoidingView>
        <ScrollView>
          <View className="py-5 px-2">
            <Formik
              initialValues={DocumentInitValues}
              onSubmit={(values) => addDocument(values)}
              validationSchema={DocumentValidationSchema}
            >
              {(formikProps: FormikValues) => (
                <>
                  <StyledDropdown
                    placeholder="--Select--"
                    title="Applicant Type"
                    mandatory={true}
                    formikProps={formikProps}
                    formikkey="applicantType"
                    dropdownData={applicantList}
                    dropLableProperty="applicantType"
                    dropValueProperty="customerId"
                  />
                  <StyledDropdown
                    placeholder="--Select--"
                    title="Document Classification"
                    mandatory={true}
                    dropdownData={DocumentLovList}
                    dropLableProperty="dmDocumentName"
                    dropValueProperty="dmSeqId"
                    formikProps={formikProps}
                    formikkey="docClassification"
                  />
                  <Button title="Submit" onPress={formikProps.handleSubmit} />
                </>
              )}
            </Formik>
          </View>

          <View>
            {applicantDocumentList.length > 0 &&
              <View className="flex flex-row items-center mx-[10px] p-[5px] bg-blue-900">
                <Text className="w-[25%] text-center mx-1 text-white font-bold text-xs">Applicant</Text>
                <Text className="w-[25%] text-center mx-1 text-white font-bold text-xs">Document Type</Text>
                <Text className="w-[25%] text-center mx-1 text-white font-bold text-xs">Document</Text>
                <Text className="w-[25%] mx-1 text-white font-bold text-xs">Action</Text>
              </View>
            }
            {/* <SafeAreaView> */}
            <FlatList
              className="h-[150px]"
              scrollEnabled={true}
              data={applicantDocumentList}
              renderItem={({ item }) => <DocumentItem
                docItemData={item}
                applicantList={applicantList}
                handleViewPress={() => viewDoc(item)}
                handleDeletePress={() => deleteDoc(item)}
              />}
              keyExtractor={(item) => item.ladSeqId}
            />
            {/* </SafeAreaView> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {modalVisible &&
        <ImageModalView
          modalVisible={modalVisible}
          imageData={imageBase64Data}
          closeModal={() => setModalVisible}
        />
      }
      <CustomBottomSheet
        ref={bottomSheetRef}
        button1="Camera"
        button2="Gallery"
        handlePress1={() => takeImg(1)}
        handlePress2={() => takeImg(2)}
        handlePress3={closeSheet}
      />
    </>
  );
};

export default Documents;