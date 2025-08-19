import { Box, Button, ClickAwayListener, Divider, useTheme } from "@mui/material";
import { useNavigate } from 'react-router-dom';

import * as React from 'react';
import { useTranslation } from "react-i18next";
import styled from '@mui/styled-engine-sc';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CollectionsIcon from '@mui/icons-material/Collections';
import SendIcon from '@mui/icons-material/Send';
import { useIssueCheckWizardData } from 'business/stores/issueCheck/useIssueCheckWizardData';
import { paths } from 'ui/route-config/paths';

import { closeApp, usePostMessage, usePostMessageRaw } from "@agribank/post-message";
import { ButtonAdapter } from "@agribank/ui/components/ButtonAdapter";
import useInitialSettingStore from "business/stores/initial-setting-store";

export default function FinalReceipt() {
	const { t } = useTranslation();
	const theme = useTheme();
	const [tooltipOpen, setTooltipOpen] = React.useState(false);
	const store = useIssueCheckWizardData((store) => store)
	const { reset } = useIssueCheckWizardData((store) => store);
	const navigate = useNavigate();

	const appVersion = useInitialSettingStore((state) => state.settings.appVersion)
	const osType = useInitialSettingStore((state) => state.settings.osType)
	console.log("appVersion", appVersion)
	console.log("osType", osType)
	const handleTooltipToggle = () => {
		setTooltipOpen((prev) => !prev);
	};

	const handleTooltipClose = () => {
		setTooltipOpen(false);
	};

	const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
		<Tooltip {...props} classes={{ popper: className }} />
	))(() => ({
		[`& .${tooltipClasses.tooltip}`]: {
			backgroundColor: "rgba(1,1,1,0.2)",
			color: '#fff',
			borderRadius: 10,
			boxShadow: theme.shadows[3],
		},
	}));

	console.log(store)

	const formattedAmount = !isNaN(Number(store?.checkInfoPage?.checkAmount)) ? Number(store?.checkInfoPage?.checkAmount).toLocaleString() : "0";

	const data = {
		[t("chequeReceiptObligor")]: store?.selectCheckPage?.selectedAccountName,
		[t("chequeReceiptChequeSerialNumber")]: store?.selectCheckPage?.selectedSheet,
		[t("chequeSeriSerial")]: store?.selectCheckPage?.checkData?.chequeTo,
		[t("chequeReceiptAmount")]: `${formattedAmount} ${t('rial')}`,
		[t("chequeReceiptDueDate")]: store?.checkInfoPage?.checkAmount,
		[t("chequeReceiptFor")]: store?.checkInfoPage?.reason?.name,
		[t("chequeReceiptIban")]: store?.checkInfoPage?.recieverIban ?? "____",
		[t("chequeReceiptDescription")]: store?.checkInfoPage?.description,
		[t("chequeReceiptNames")]: store?.addReceiverPage?.receivers?.map((item) => item.name).join(" - ")
	}
	const shareTextData = {
		message: t("chequeReceiptSuccess"),
		url: "",
		[t("chequeReceiptObligor")]: store?.selectCheckPage?.selectedAccountName,
		[t("chequeReceiptChequeSerialNumber")]: store?.selectCheckPage?.selectedSheet,
		[t("chequeSeriSerial")]: store?.selectCheckPage?.checkData?.chequeTo,
		[t("chequeReceiptAmount")]: `${formattedAmount} ${t('rial')}`,
		[t("chequeReceiptDueDate")]: store?.checkInfoPage?.checkAmount,
		[t("chequeReceiptFor")]: store?.checkInfoPage?.reason?.name,
		[t("chequeReceiptIban")]: store?.checkInfoPage?.recieverIban ?? "____",
		[t("chequeReceiptDescription")]: store?.checkInfoPage?.description,
		[t("chequeReceiptNames")]: store?.addReceiverPage?.receivers?.map((item) => item.name).join(" - ")

	}
	const shareImageData = {
		message: t("chequeReceiptSuccess"),
		url: "",
		data: {
			[t("chequeReceiptObligor")]: store?.selectCheckPage?.selectedAccountName,
			[t("chequeReceiptChequeSerialNumber")]: store?.selectCheckPage?.selectedSheet,
			[t("chequeSeriSerial")]: store?.selectCheckPage?.checkData?.chequeTo,
			[t("chequeReceiptAmount")]: `${formattedAmount} ${t('rial')}`,
			[t("chequeReceiptDueDate")]: store?.checkInfoPage?.checkAmount,
			[t("chequeReceiptFor")]: store?.checkInfoPage?.reason?.name,
			[t("chequeReceiptIban")]: store?.checkInfoPage?.recieverIban ?? "____",
			[t("chequeReceiptDescription")]: store?.checkInfoPage?.description,
			[t("chequeReceiptNames")]: store?.addReceiverPage?.receivers?.map((item) => item.name).join(" - ")
		}
	}
	const saveImageData = {
		message: t("chequeReceiptSuccess"),
		url: "",
		data: {
			[t("chequeReceiptObligor")]: store?.selectCheckPage?.selectedAccountName,
			[t("chequeReceiptChequeSerialNumber")]: store?.selectCheckPage?.selectedSheet,
			[t("chequeSeriSerial")]: store?.selectCheckPage?.checkData?.chequeTo,
			[t("chequeReceiptAmount")]: `${formattedAmount} ${t('rial')}`,
			[t("chequeReceiptDueDate")]: store?.checkInfoPage?.checkAmount,
			[t("chequeReceiptFor")]: store?.checkInfoPage?.reason?.name,
			[t("chequeReceiptIban")]: store?.checkInfoPage?.recieverIban ?? "____",
			[t("chequeReceiptDescription")]: store?.checkInfoPage?.description,
			[t("chequeReceiptNames")]: store?.addReceiverPage?.receivers?.map((item) => item.name).join(" - ")
		}
	}

	const { send: sendPostMessageShareText } = usePostMessage({
		message: (data) => {
			return { type: "shareText", data: { ...data } } as any;
		},
		callback: (e) => {
			console.log(e)
		}
	});

	const { send: sendPostMessageShareImage } = usePostMessage({
		message: (data) => {
			return { type: "shareImage", data: { ...data } } as any;
		},
		callback: (e) => {
			console.log(e)
		}
	});

	const { send: sendPostMessageSaveImage } = usePostMessage({
		message: (data) => {
			return { type: "saveImage", data: { ...data } } as any;
		},
		callback: (e) => {
			console.log(e)
		}
	});

	usePostMessageRaw({
		callback: (e: any) => {
			if (e.data.type == "goback")
				closeApp()
		}
	});

	const handleRefuse = () => {
		reset();
		navigate(paths.Home, { replace: true });
	};

	return (
		<div className="flex flex-col h-full">
			<img src={"/cheque/assets/Keshavarzi.svg"} width={60} alt="icon" className="mx-auto mt-5" />
			<Box
				sx={(t) => ({
					backgroundColor: t.palette.primary[50],
					width: "95%",
					height: "50px",
					borderRadius: "20px",
					marginLeft: "auto",
					marginRight: "auto",
					fontWeight: "bold",
					color: t.palette.success.main

				})}
				display={"flex"}
				flexDirection={"row"}
				padding={"1rem"}
				justifyContent={"center"}
				alignItems={"center"}
				gap={10}
			>
				<img src={"/cheque/assets/circle-check.png"} width={30} alt="icon" />
				{t('chequeReceiptSuccess')}
			</Box>
			<Box
				height={"100%"}
				width={"100%"}
				maxWidth={500}
				marginLeft={"auto"}
				marginRight={"auto"}
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "start",
					gap: "0.5rem",
					backgroundImage: `url("${theme.palette.mode == "light" ? "/cheque/assets/bg.png" : "/cheque/assets/bgw.png"}")`,
					backgroundRepeat: "no-repeat",
					backgroundPosition: "top",
					backgroundPositionY: "-20px",
					backgroundSize: "100%",
					paddingTop: 20,
				}}
			>
				{Object.entries(data).map(([key, value]) => {
					return <div key={key} className='flex flex-col'>
						<div className="flex w-full px-5 justify-between"><span className="font-bold">{key}</span><span dir='ltr'>{value as any}</span></div>
						<Divider variant="fullWidth" sx={{ width: "90%", marginRight: "auto", marginLeft: "auto", marginTop: 6, marginBottom: 6, borderColor: theme.palette.divider }} />
					</div>
				})}

			</Box>
			<Box
				width={"95%"}
				maxWidth={"400px"}
				display={"flex"}
				flexDirection={"row"}
				justifyContent={"space-between"}
				justifyItems={"end"}
				flexWrap={"nowrap"}
				marginLeft={"auto"}
				marginRight={"auto"}
				marginBottom={10}
				gap={"10px"}
			>
				{appVersion && osType !== 3 && <ClickAwayListener onClickAway={handleTooltipClose}>
					<div className='w-1/2'>
						<HtmlTooltip
							open={tooltipOpen}
							onClose={() => setTooltipOpen(false)}
							onOpen={() => setTooltipOpen(true)}
							disableFocusListener
							disableHoverListener
							disableTouchListener
							title={
								<div className='flex flex-col gap-2 w-full justify-center items-center' >
									<ButtonAdapter
										onClick={() => { sendPostMessageShareText(shareTextData); setTooltipOpen(false) }}
										disabled={false}
										muiButtonProps={{ sx: { height: "fit-content", width: "100%", padding: "10px" } }}
										startIcon={<ContentCopyIcon />}
										variant="contained"
									>
										{t("shareText")}
									</ButtonAdapter>
									<ButtonAdapter
										onClick={() => { sendPostMessageShareImage(shareImageData); setTooltipOpen(false) }}
										disabled={false}
										muiButtonProps={{ sx: { height: "fit-content", width: "100%", padding: "10px" } }}
										startIcon={<SendIcon />}
										variant="contained"
									>
										{t("shareImage")}
									</ButtonAdapter>
									<ButtonAdapter
										onClick={() => { sendPostMessageSaveImage(saveImageData); setTooltipOpen(false) }}
										disabled={false}
										muiButtonProps={{ sx: { height: "fit-content", width: "100%", padding: "10px" } }}
										startIcon={<CollectionsIcon />}
										variant="contained"
									>
										{t("saveImage")}
									</ButtonAdapter>
								</div>
							}
						>
							<Button
								variant="contained"
								onClick={handleTooltipToggle}
								startIcon={<ShareIcon />}
								sx={{
									width: "100%",
									height: "fit-content",
									padding: "10px",
								}}
							>{t("share")}
							</Button>
						</HtmlTooltip>
					</div>
				</ClickAwayListener>
				}
				<ButtonAdapter
					onClick={handleRefuse}
					disabled={false}
					muiButtonProps={{
						sx: {
							width: (appVersion && osType !== 3) ? "50%" : "100%",
							height: "fit-content",
							padding: "10px"
						}
					}}
					variant="outlined"
				>
					{t("go-back")}
				</ButtonAdapter>

			</Box>
		</div>

	);
}
