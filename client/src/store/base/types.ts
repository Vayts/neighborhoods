export interface IBaseState {
	theme: string,
	lang: string,
	modal: {
		type: string,
		content: Record<string, string|number> | null,
	}
}
