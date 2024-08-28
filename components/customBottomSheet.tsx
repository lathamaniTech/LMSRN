/*
@author         :   Lathamani
@since          :   14/08/2024
@description    :   reusable component of action bottom sheet
*/

import { View, Text, TouchableOpacity } from 'react-native'
import React, { forwardRef, useMemo, useRef } from 'react'
import BottomSheet from "@gorhom/bottom-sheet";
export type Ref = BottomSheet;
export type Props = {
    button1: string,
    button2: string,
    handlePress1: any,
    handlePress2: any,
    handlePress3: any,
}
const CustomBottomSheet = forwardRef<Ref, Props>(({ button1, button2, handlePress1, handlePress2, handlePress3 }: Props, ref) => {
    const snapPoints = useMemo(() => ['1%', '50%', '75%'], []);
    return (
        <View className='flex-1 items-center '>
            <BottomSheet
                ref={ref}
                index={0}
                snapPoints={snapPoints}
                handleIndicatorStyle={{ backgroundColor: '#fff' }}
                backgroundStyle={{ backgroundColor: '#4b5563' }}
                enablePanDownToClose={true}
            // backdropComponent={renderBackdrop}
            >
                <View className='flex px-3'>
                    <Text className='text-center text-white text-xl font-bold p-[10px]'>Choose Image Capturing</Text>
                    <TouchableOpacity
                        className={`min-h-[45px] justify-center items-start`}
                        activeOpacity={0.7}
                        onPress={handlePress1}
                    >
                        <Text className={`text-white font-psemibold text-md`}>
                            {button1}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className={`min-h-[45px] justify-center items-start`}
                        activeOpacity={0.7}
                        onPress={handlePress2}
                    >
                        <Text className={`text-white font-psemibold text-md`}>
                            {button2}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className={`min-h-[45px] justify-center items-start`}
                        activeOpacity={0.7}
                        onPress={handlePress3}
                    >
                        <Text className={`text-white font-psemibold text-md`}>
                            Close
                        </Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet >
        </View>
    )
});

export default CustomBottomSheet;
