/*
@author         :   Lathamani
@since          :   20/08/2024
@description    :   lead document upload page
*/
import { View, Text, Modal, Pressable, StyleSheet, Alert, Image } from 'react-native'
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export type ImageModalProp = {
    modalVisible: boolean,
    imageData: any,
    closeModal: any
}
const ImageModalView = ({ modalVisible, imageData, closeModal }: ImageModalProp) => {
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal(false)}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View className='flex items-end'>
                            <Ionicons className='' name="close" size={30} color="gray" onPress={closeModal(false)} />
                        </View>
                        <View className='flex item-center my-[10px]'>
                            <Text className='text-base text-semiBold'>{imageData.name}</Text>
                        </View>
                        <Image source={{ uri: imageData.imgData }}
                            resizeMode='contain'
                            className='w-[100%] h-[100%]'
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ImageModalView;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        // borderRadius: 20,
        padding: 15,
        width: '100%',
        height: '100%',
        // alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});