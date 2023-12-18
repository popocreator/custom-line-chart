// X축 그리기
const renderXAxis = (width, height, padding = 0) => {
	return `
    <polyline
        fill="none"
        stroke="#000000"
        strokeWidth="1"
        points="${padding},${height - padding} ${width - padding},${
		height - padding
	}"
    />
  `;
};

// Y축 그리기
const renderYAxis = (width, height, padding = 0) => {
	return `
    <polyline
        fill="none"
        stroke="#000000"
        strokeWidth="1"
        points="${padding},${padding} ${padding},${height - padding}"
    />
  `;
};

const renderPoints = (
	width,
	height,
	dataset = [
		{xLabel: '1th', x: 0, y: 20},
		{xLabel: '2th', x: 1, y: 50},
		{xLabel: '3th', x: 2, y: 30},
	],
	padding = 0
) => {
	const x_max = Math.max(...dataset.map((e) => e.x));
	const y_max = Math.max(...dataset.map((e) => e.y));

	const lineChartWidth = width - 2 * padding;
	const lineChartHeight = height - 2 * padding;

	return `
    <polyline
        fill="none"
        stroke="#000000"
        strokeWidth="1"
        points="${dataset
					.map((element, index) => {
						const x = (element.x / x_max) * lineChartWidth + padding;
						const y = (1 - element.y / y_max) * lineChartHeight + padding;
						return `${x},${y}`;
					})
					.join(' ')}"
    />
  `;
};

const renderGuideLineY = (width, height, length, padding = 0) => {
	const startX = padding;
	const endX = width - padding;
	return new Array(length - 1).fill(0).map((_, index) => {
		const ratio = (index + 1) / length;
		const y = ratio * (height - 2 * padding) + padding;
		return `
      <polyline
        fill="none"
        stroke="#eeeeee"
        strokeWidth="1"
        points="${startX},${y} ${endX},${y}"
      />
    `;
	});
};

const renderGuideLineX = (width, height, length, padding = 0) => {
	const startY = padding;
	const endY = height - padding;
	return new Array(length - 1).fill(0).map((_, index) => {
		const ratio = (index + 1) / length;
		const x = ratio * (width - 2 * padding) + padding;
		return `
      <polyline
        fill="none"
        stroke="#eeeeee"
        strokeWidth="1"
        points="${x},${startY} ${x},${endY}"
      />
    `;
	});
};

const renderContainer = (width, height) => {
	return `
    <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      ${renderXAxis(width, height)}
      ${renderYAxis(width, height)}
      ${renderPoints(width, height, [
				{xLabel: '1th', x: 0, y: 20},
				{xLabel: '2th', x: 1, y: 50},
				{xLabel: '3th', x: 2, y: 30},
			])}
      ${renderGuideLineX(width, height, 5)}
      ${renderGuideLineY(width, height, 5)}
    </svg>
  `;
};

document.querySelector('#lineChart').innerHTML = renderContainer(500, 500);
