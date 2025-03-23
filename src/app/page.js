'use client';
import { useScroll, useTransform, motion } from 'framer-motion';
import Picture1 from '../../public/images/1.jpg';
import Picture2 from '../../public/images/2.jpg';
import Picture3 from '../../public/images/3.jpg';
import Lenis from 'lenis';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function Home() {
	useEffect(() => {
		const lenis = new Lenis();
		function raf(time) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}
		requestAnimationFrame(raf);
	}, []);

	const container = useRef();

	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start end', 'end start'],
	});

	return (
		<main className='overflow-hidden'>
			<div className='h-[100vh]' />
			<div ref={container}>
				<Slide
					src={Picture1}
					left={'-55%'}
					progress={scrollYProgress}
					direction='left'
				/>
				<Slide
					src={Picture2}
					left={'-15%'}
					progress={scrollYProgress}
					direction='right'
				/>
				<Slide
					src={Picture3}
					left={'-40%'}
					progress={scrollYProgress}
					direction='left'
				/>
			</div>
			<div className='h-[100vh]' />
		</main>
	);
}

const Slide = ({ src, left, progress, direction }) => {
	const dir = direction == 'left' ? -1 : 1;
	const x = useTransform(progress, [0, 1], [-250 * dir, dir * 250]);

	return (
		<motion.div
			className='relative flex whitespace-nowrap'
			style={{ left, x }}>
			<Phrase src={src} />
			<Phrase src={src} />
			<Phrase src={src} />
		</motion.div>
	);
};

const Phrase = ({ src }) => {
	return (
		<div className={'flex gap-5 items-center px-5'}>
			<p className='text-[7.5vw]'>Front End Developer</p>
			<span className='relative h-[7.5vw] aspect-[4/2] rounded-full overflow-hidden'>
				<Image
					style={{ objectFit: 'cover' }}
					src={src}
					alt='image'
					fill
				/>
			</span>
		</div>
	);
};
