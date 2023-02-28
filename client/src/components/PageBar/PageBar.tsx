import React from 'react';
import { PageBarWrapper, PageLink, PageLinkIcon, PageLinkText, SubPageBar } from '@src/components/PageBar/style';
import { useTranslation } from 'react-i18next';
import { Title } from '@src/components/Title/Title';
import { useAppSelector } from '@src/hooks/hooks';
import { selectCurrentNeighborhood } from '@src/store/neighborhoods/selectors';

export const PageBar: React.FC = () => {
	const { t } = useTranslation();
	const neighborhood = useAppSelector(selectCurrentNeighborhood);
	
	return (
		<PageBarWrapper>
			<Title fz='16px' margin='10px 0'>{t('main')}</Title>
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
				<SubPageBar>
					<Title fz='16px' margin='10px 0'>{neighborhood.title}</Title>
					<PageLink to={`neighborhood/debts/${neighborhood._id}`}>
						<PageLinkIcon className='icon-debts'/>
						<PageLinkText>{t('debtTitle')}</PageLinkText>
					</PageLink>
					<PageLink to={`neighborhood/debtors/${neighborhood._id}`}>
						<PageLinkIcon className='icon-debtors'/>
						<PageLinkText>{t('debtors')}</PageLinkText>
					</PageLink>
					<PageLink to={`neighborhood/tasks/${neighborhood._id}`}>
						<PageLinkIcon className='icon-Task'/>
						<PageLinkText>{t('duties')}</PageLinkText>
					</PageLink>
				</SubPageBar>
			)}
		</PageBarWrapper>
	);
};
