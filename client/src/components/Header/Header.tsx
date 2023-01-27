import React from 'react';
import { HeaderLogoImg, HeaderLogoTitle, HeaderLogoWrapper, HeaderWrapper } from '@src/components/Header/style';
import { UserMenu } from '@src/components/Header/UserMenu/UserMenu';

export const Header: React.FC = () => {
	return (
		<HeaderWrapper>
			<HeaderLogoWrapper>
				<HeaderLogoImg src='./assets/img/logo.svg' alt='logo'/>
				<HeaderLogoTitle>Neighborhood</HeaderLogoTitle>
			</HeaderLogoWrapper>
			<UserMenu/>
		</HeaderWrapper>
	);
};
