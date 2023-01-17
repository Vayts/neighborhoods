import React from 'react';
import { PageBarWrapper, PageLink, PageLinkIcon, PageLinkText } from '@src/components/PageBar/style';
import { useTranslation } from 'react-i18next';

export const PageBar: React.FC = () => {
	const { t } = useTranslation();
	
	return (
		<PageBarWrapper>
			<PageLink to='/'>
				<PageLinkIcon className='icon-Project'/>
				<PageLinkText>{t('mainPage')}</PageLinkText>
			</PageLink>
			<PageLink to='/neighborhoods'>
				<PageLinkIcon className='icon-home'/>
				<PageLinkText>{t('neighborhoods')}</PageLinkText>
			</PageLink>
			<PageLink to='/notification'>
				<PageLinkIcon className='icon-notification'/>
				<PageLinkText>{t('notifications')}</PageLinkText>
			</PageLink>
		</PageBarWrapper>
	);
};
