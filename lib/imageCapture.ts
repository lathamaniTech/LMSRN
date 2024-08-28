import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as WebBrowser from "expo-web-browser";

const options: ImagePicker.ImagePickerOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.All,
  allowsEditing: true,
  aspect: [3, 2],
  quality: 0.5,
  base64: true,
};
export const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync(options);
  if (!result.canceled) {
    return result.assets[0];
  }
};

export const captureImage = async () => {
  let result = await ImagePicker.launchCameraAsync(options);
  if (!result.canceled) {
    return result.assets[0];
  }
};

export const convertBase64ToDataURL = async (
  base64String: string,
  fileName: string,
  fileExtn: string
) => {
  const fileUri = `${FileSystem.documentDirectory}${fileName}.${fileExtn}`;
  await FileSystem.writeAsStringAsync(fileUri, base64String, {
    encoding: FileSystem.EncodingType.Base64,
  });

  return fileUri;
};

export const openPdf = async (fileUri: string) => {
  await WebBrowser.openBrowserAsync(fileUri);
};
