export interface IConfirmOption {
	title?: React.ReactNode;
	description?: React.ReactNode;
	callback?: () => Promise<void>;
}

const useConfirm: () => (options?: IConfirmOption) => Promise<void>;

export default useConfirm;
