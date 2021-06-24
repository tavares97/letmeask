import copyImg from '../assets/images/copy.svg';

import '../styles/room-code.scss';

type RoomCodeProps = {
	code: string;
};

const RoomCode = (props: RoomCodeProps) => {
	const copyCodeToClipboard = () => {
		navigator.clipboard.writeText(props.code);
	};

	return (
		<button className='room-code'>
			<div>
				<img src={copyImg} alt='Copy room code' />
			</div>
			<span>{props.code}</span>
		</button>
	);
};

export default RoomCode;
