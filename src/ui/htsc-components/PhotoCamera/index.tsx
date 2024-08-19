import { useRef, useState } from 'react';
import { Camera, CameraType } from 'react-camera-pro';

import './styles.css';

// https://www.npmjs.com/package/react-camera-pro?activeTab=readme

type Props = {
	onTakePhoto: (photo: string | null) => void;
};

export default function PhotoCamera(props: Props) {
	const { onTakePhoto } = props;

	const [image, setImage] = useState<string | null>(null);
	const [showImage, setShowImage] = useState<boolean>(false);
	const camera = useRef<CameraType>(null);

	return (
		<div className="container">
			<div
				id="top-left"
				className="corner"
			></div>
			<div
				id="top-right"
				className="corner"
			></div>
			<div
				id="bottom-right"
				className="corner"
			></div>
			<div
				id="bottom-left"
				className="corner"
			></div>
			<div className="wrapper">
				{showImage ? (
					<div
						className="fullScreenImagePreview"
						style={{ backgroundImage: image ? `url(${image})` : '' }}
						onClick={() => {
							setShowImage(!showImage);
						}}
					/>
				) : (
					<Camera
						ref={camera}
						aspectRatio={'cover'}
						facingMode="environment"
						errorMessages={{
							noCameraAccessible:
								'No camera device accessible. Please connect your camera or try a different browser.',
							permissionDenied: 'Permission denied. Please refresh and give camera permission.',
							switchCamera:
								'It is not possible to switch camera to different one because there is only one video device accessible.',
							canvas: 'Canvas is not supported.'
						}}
					/>
				)}
				<button
					className="takePhotoButton"
					onClick={() => {
						if (camera.current) {
							const photo = camera.current.takePhoto();
							setImage(photo as string);
							onTakePhoto(photo as string);
							setShowImage(true);
						}
					}}
				></button>
			</div>
		</div>
	);
}
