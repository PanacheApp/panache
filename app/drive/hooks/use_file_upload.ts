import { useState } from "react";
import axios, { AxiosError, AxiosProgressEvent, AxiosResponse, } from "axios";

export function useFileUpload(endpoint: string ) {
	const [response, setResponse] = useState<AxiosResponse<any> | undefined>();
	const [errors, setErrors] = useState<AxiosError<any, any> | undefined>();
	const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
	const [uploadProgress, setUploadProgress] = useState<Record<number, number>>({});

	const uploadFile = async (file: File, key: number = 0 ) => {
		const formData = new FormData();
		formData.append("file", file);

		try {
			setStatus("pending");
			const res = await axios.post(endpoint, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
				onUploadProgress: (progressEvent: AxiosProgressEvent) => {
					const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
					setUploadProgress({ [key]: percentCompleted });
				},
			});
			setResponse(res);
			setStatus("success");
			return res;
		} catch (error: any) {
			setErrors(error);
			setStatus("error");
		}
		return null;
	};

	return { uploadFile, uploadProgress, response, status, errors };
}

