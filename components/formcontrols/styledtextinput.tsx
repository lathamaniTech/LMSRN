import { View, Text, TextInput, TextInputProps } from "react-native";

export type StyledtextinputProps = {
  formikProps: any;
  label: string;
  formikkey: string;
  mandatory: boolean;
  fieldsGrpStyle?: string;
  fieldsAlignStyle?: string;
  labeledAlignStyle?: string;
  editable?: boolean;
};

const Styledtextinput = ({
  formikProps,
  label,
  formikkey,
  mandatory,
  fieldsGrpStyle,
  fieldsAlignStyle,
  labeledAlignStyle,
  editable,
  ...rest
}: TextInputProps & StyledtextinputProps) => {
  return (
    <View>
      <View className={`${fieldsGrpStyle ? fieldsGrpStyle + ' mb-1' : ''}`}>
        <Text className={`text-navy text-sm pl-3 ${labeledAlignStyle ? labeledAlignStyle + ' pt-[10]' : 'w-full absolute pt-[-5]'}`}>
          {label}
          {mandatory && <Text className="text-psemibold text-error"> *</Text>}
        </Text>

        <TextInput
          className={`mt-2 ml-2 border-b border-gray-100 ${fieldsAlignStyle ? fieldsAlignStyle + ' px-2 py-1' : 'p-2'} ${editable == false ? 'text-gray-800 bg-gray-300' : 'text-black bg-transparent'}`}
          onChangeText={formikProps.handleChange(formikkey)}
          onBlur={formikProps.handleBlur(formikkey)}
          value={formikProps.values[formikkey]}
          editable={editable}
          {...rest}
        />
      </View>
      <View>
        <Text className="text-error px-3 text-right">
          {formikProps.touched[formikkey] && formikProps.errors[formikkey]}
        </Text>
      </View>
    </View>

  );
};

export default Styledtextinput;
