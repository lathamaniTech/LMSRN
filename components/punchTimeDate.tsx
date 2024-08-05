import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import * as AppType from "@/apptypes/AppTypes";

export type punchTypeValProps = {
    punchIn: AppType.PunchTypeData;
    punchOut: AppType.PunchTypeData;
};

const PunchTimeDateBlock = (props: punchTypeValProps) => {
    // const [time, setTime] = useState(props.punTime ? props.punTime : new Date().toLocaleTimeString());
    const [todayDate] = useState(moment(new Date()).format('DD/MM/YYYY'));
    const [day] = useState(new Date().toLocaleDateString('en-US', { weekday: 'long' }));
    // const [punchType, setPunch] = useState(props.punchType ? props.punchType : '');

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         let punchtime = new Date().toLocaleTimeString();
    //         setTime(punchtime);
    //     }, 1000);

    //     return () => clearInterval(timer);
    // }, [props.punTime]);

    return (
        <View className='w-full h-[100px] bg-gray-300'>
            <View className="flex flex-row item-center justify-center mt-2">
                {props.punchIn.punchType && <View className={`${props.punchOut.punchType ? 'w-[50%]' : 'w-[100%]'}`}>
                    <Text className='text-center text-base text-gray-400 font-bold'>{props.punchIn.punchType}</Text>
                    <Text className='text-center text-xl font-bold'>{props.punchIn.time ? props.punchIn.time : ''}</Text>
                </View>
                }
                {props.punchOut.punchType &&
                    <View className='w-[50%]'>
                        <Text className='text-center text-base text-gray-400 font-bold'>{props.punchOut.punchType}</Text>
                        <Text className='text-center text-xl font-bold'>{props.punchOut.time ? props.punchOut.time : ''}</Text>
                    </View>
                }
            </View>
            <Text className='text-center text-base text-gray-400 font-bold mt-3'>
                {day}, {todayDate}</Text>
        </View>
    )
}

export default PunchTimeDateBlock;