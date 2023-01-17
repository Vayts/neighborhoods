import React from 'react';

export interface IButton {
    id?: string;
    name?: string;
    onClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
    value?: string;
    type?: 'submit' | 'reset' | 'button';
    title?: string;
    borderRadius?: string;
    isDisabled?: boolean;
    color?: string;
    fontSize?: string;
    fontWeight?: string;
    bgColor?: string;
    bgColorHover?: string;
    height?: string;
    width?: string;
    padding?: string;
    margin?: string;
    content?: string;
    transition?: string;
    focusColor?: string;
    bgColorDisabled?: string;
    position?: string;
    right?:string;
}
