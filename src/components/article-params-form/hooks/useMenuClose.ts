import { useEffect } from 'react';

type UseMenuClose = (params: {
	containerRef: React.RefObject<HTMLElement>;
	isMenuOpen: boolean;
	setMenuClosed: () => void;
}) => void;

export const useMenuClose: UseMenuClose = ({
	containerRef,
	isMenuOpen,
	setMenuClosed,
}) => {
	useEffect(() => {
		if (!isMenuOpen) return;

		const handleMousedown = ({ target }: MouseEvent) => {
			if (target instanceof Node && !containerRef.current?.contains(target)) {
				setMenuClosed();
			}
		};

		const handleEscape = ({ key }: KeyboardEvent) => {
			if (key === 'Escape') {
				setMenuClosed();
			}
		};

		window.addEventListener('mousedown', handleMousedown);
		window.addEventListener('keydown', handleEscape);

		return () => {
			window.removeEventListener('mousedown', handleMousedown);
			window.removeEventListener('keydown', handleEscape);
		};
	}, [containerRef, isMenuOpen, setMenuClosed]);
};