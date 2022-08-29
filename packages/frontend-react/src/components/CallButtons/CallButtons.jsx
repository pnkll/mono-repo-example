import { MicrophoneIcon, PhoneIcon, PhoneMissedCallIcon, PhoneOutgoingIcon, SpeakerphoneIcon } from "@heroicons/react/outline"
import './CallButtons.scss'

export const PhoneButton = ({style,width=23, onClick,disabled}) => {
    return (
        <button onClick={onClick} disabled={disabled} className="call-icon" style={style}><PhoneIcon width={width} color='white' style={{ paddingTop: '1px' }} /></button>
    )
}

export const MicButton = ({style,width=23, onClick,disabled}) => {
    return(
        <button onClick={onClick} disabled={disabled} className="call-icon mic" style={style}><MicrophoneIcon width={width} color='white'/></button>
    )
}

export const SpeakerButton = ({style,width=23, onClick,disabled}) =>{
    return(
        <button onClick={onClick} disabled={disabled} className="call-icon speaker" style={style}><SpeakerphoneIcon width={width} color='white'/></button>
    )
}

export const PhoneDownButton = ({style,width=23, onClick,disabled}) => {
    return (
        <button onClick={onClick} disabled={disabled} className="call-icon down" style={style}><PhoneMissedCallIcon width={width} color='white' style={{paddingTop: '1px', paddingRight: '2px'}}/></button>
    )
}

export const PhoneOutgoingButton = ({style,width=23, onClick,disabled})=>{
    return (
        <button onClick={onClick} disabled={disabled} className="call-icon outgoing" style={style}><PhoneOutgoingIcon width={width} color='white' style={{paddingTop: '1px', paddingRight: '2px'}}/></button>
    )
}