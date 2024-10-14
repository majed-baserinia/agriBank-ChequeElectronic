import { InquiryTransferStatusRespone } from 'common/entities/cheque/transferCheck/InquiryTransferStatus/InquiryTransferStatusResponse';
import { Dispatch, SetStateAction } from 'react';

export type Props = { checkData: InquiryTransferStatusRespone; setLoading: Dispatch<SetStateAction<boolean>> };
