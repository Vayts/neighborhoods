import React from 'react';
import { BlockMenuSliderProps } from '@src/components/BlockMenuSlider/types';
import { SliderMenuWrapper, SlideTitle } from '@src/components/BlockMenuSlider/style';

export const BlockMenuSlider: React.FC<BlockMenuSliderProps> = ({ setActive, active, title, length }: BlockMenuSliderProps) => {
	const nextClick = () => {
		if (active + 1 >= length) {
			setActive(0);
		} else {
			setActive(active + 1);
		}
	};
	
	const prevClick = () => {
		if (active - 1 < 0) {
			setActive(length - 1);
		} else {
			setActive(active - 1);
		}
	};
	
	return (
		<>
			<SliderMenuWrapper>
				<span className='icon-drop-down' onClick={() => prevClick()}/>
				<SlideTitle>{title}</SlideTitle>
				<span className='icon-drop-down' onClick={() => nextClick()}/>
			</SliderMenuWrapper>
		</>
	);
};
