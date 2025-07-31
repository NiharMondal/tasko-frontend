import { colors, labels } from "@/helper";
import React, { useEffect, useRef, useState } from "react";
type WheelProps = {
	onFinish: (result: string) => void;
	spinning: boolean;
};
const SEGMENT_COUNT = labels.length;

export default function Wheel({ spinning, onFinish }: WheelProps) {
	const [rotation, setRotation] = useState(0);
	const wheelRef = useRef(null);

	useEffect(() => {
		if (spinning) {
			const randomIndex = Math.floor(Math.random() * SEGMENT_COUNT);
			const segmentAngle = 360 / SEGMENT_COUNT;
			const targetRotation =
				360 * 5 + (360 - randomIndex * segmentAngle) - segmentAngle / 2;

			setRotation(targetRotation);

			// Call onFinish after animation duration (~3s)
			setTimeout(() => {
				onFinish(labels[randomIndex]);
			}, 3000);
		}
	}, [spinning, onFinish]);

	return (
		<div className="relative">
			{/* Pointer */}
			<div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 z-10">
				<div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[30px] border-l-transparent border-r-transparent border-b-green-600 shadow-lg"></div>
			</div>

			{/* Wheel SVG */}
			<svg
				viewBox="0 0 200 200"
				width={300}
				height={300}
				ref={wheelRef}
				style={{
					transform: `rotate(${rotation}deg)`,
					transition: "transform 3s cubic-bezier(0.33, 1, 0.68, 1)",
				}}
			>
				{labels.map((_, i) => {
					const startAngle = (i / SEGMENT_COUNT) * 2 * Math.PI;
					const endAngle = ((i + 1) / SEGMENT_COUNT) * 2 * Math.PI;
					const x1 = 100 + 100 * Math.cos(startAngle);
					const y1 = 100 + 100 * Math.sin(startAngle);
					const x2 = 100 + 100 * Math.cos(endAngle);
					const y2 = 100 + 100 * Math.sin(endAngle);
					const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

					return (
						<path
							key={i}
							d={`M100,100 L${x1},${y1} A100,100 0 ${largeArc} 1 ${x2},${y2} Z`}
							fill={colors[i]}
						/>
					);
				})}

				{/* Labels */}
				{labels.map((label, i) => {
					const angle = ((i + 0.5) / SEGMENT_COUNT) * 2 * Math.PI;
					const x = 100 + 60 * Math.cos(angle);
					const y = 100 + 60 * Math.sin(angle);
					return (
						<text
							key={label}
							x={x}
							y={y}
							textAnchor="middle"
							alignmentBaseline="middle"
							fontSize="10"
							transform={`rotate(${
								(angle * 180) / Math.PI
							}, ${x}, ${y})`}
						>
							{label}
						</text>
					);
				})}
			</svg>
		</div>
	);
}
