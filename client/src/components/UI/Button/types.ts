import React from 'react';

export interface IButton {
    id?: string;
    name?: string;
    onClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
    value?: string;
    type?: 'submit' | 'reset' | 'button';
    title: string;
    isDisabled?: boolean;
    fz?: string;
    height?: string;
    width?: string;
    padding?: string;
    margin?: string;
		isLoading?: boolean;
}
