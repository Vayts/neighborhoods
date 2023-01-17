import React from 'react';
import { SmallInfoBlockProps } from '@src/components/SmallInfoBlock/types';
import {
	LinkWrapper,
	SmallIcon,
	SmallInfoBlockWrapper,
	SmallSubTitle,
	SmallTitle,
	SmallValue,
} from '@src/components/SmallInfoBlock/style';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const SmallInfoBlock: React.FC<SmallInfoBlockProps> = (
	{
		iconBgColor,
		icon,
		title,
		subTitle,
		value,
		moreLink,
	}: SmallInfoBlockProps) => {
	const { t } = useTranslation();
	
	return (
		<SmallInfoBlockWrapper>
			<SmallIcon bgColor={iconBgColor}>
				<span className={icon}/>
			</SmallIcon>
			<SmallTitle>{title}</SmallTitle>
			<SmallValue>{value}</SmallValue>
			<SmallSubTitle>{subTitle}</SmallSubTitle>
			<LinkWrapper>
				<NavLink to={moreLink}>{t('details')}</NavLink>
			</LinkWrapper>
		</SmallInfoBlockWrapper>
	);
};
