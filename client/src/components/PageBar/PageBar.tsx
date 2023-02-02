import React from 'react';
import { PageBarWrapper, PageLink, PageLinkIcon, PageLinkText } from '@src/components/PageBar/style';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Title } from '@src/components/Title/Title';
import { useAppSelector } from '@src/hooks/hooks';
import { selectCurrentNeighborhood } from '@src/store/neighborhoods/selectors';

export const PageBar: React.FC = () => {
	const { t } = useTranslation();
	const neighborhood = useAppSelector(selectCurrentNeighborhood);
	
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
			{neighborhood && (
				<>
					<Title fz='16px'>{neighborhood.title}</Title>
					<PageLink to={`neighborhood/debts/${neighborhood._id}`}>
						<PageLinkIcon className='icon-event'/>
						<PageLinkText>{t('debtTitle')}</PageLinkText>
					</PageLink>
				</>
			)}
		</PageBarWrapper>
	);
};
