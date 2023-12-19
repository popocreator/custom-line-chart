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

// 선/점 그리기
const renderLinesAndPoints = (
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
    ${dataset
			.map((element, index) => {
				const x = (element.x / x_max) * lineChartWidth + padding;
				const y = (1 - element.y / y_max) * lineChartHeight + padding;
				return `<circle cx="${x}" cy="${y}" r="5" fill="blue" />`;
			})
			.join(' ')}
  `;
};

// 가이드라인 Y - 가로선 그리기
const renderGuideLineY = (
	width,
	height,
	length,
	fontSize = 14,
	padding = 0
) => {
	const startX = padding;
	const endX = width - padding;
	return new Array(length).fill(0).map((_, index) => {
		const ratio = (index + 1) / length;
		const y = (1 - ratio) * (height - 2 * padding) + padding;
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

// 가이드라인 X - 세로선 그리기
const renderGuideLineX = (
	width,
	height,
	length,
	fontSize = 14,
	padding = 0
) => {
	const startY = padding;
	const endY = height - padding;
	return new Array(length).fill(0).map((_, index) => {
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

// x축 라벨 그리기
const renderXLabel = (width, height, dataset, fontSize = 14, padding = 0) => {
	const endY = height - padding;
	return dataset.map((element, index) => {
		const ratio = element.x / Math.max(...dataset.map((data) => data.x));
		const x = ratio * (width - 2 * padding) + padding;
		return `
      <text
        class="x-label"
        x=${x}
        y=${endY + fontSize * 2}
        style="fill: black; font-size: ${fontSize}"
      >${element.xLabel}</text>
    `;
	});
};

// y축 라벨 그리기
const renderYLabel = (
	width,
	height,
	dataset,
	guildLength = 5,
	fontSize = 14,
	padding = 0
) => {
	const startX = padding;
	return new Array(guildLength).fill(0).map((_, index) => {
		const ratio = (index + 1) / guildLength;
		const y = (1 - ratio) * (height - 2 * padding) + padding;
		const label = (
			((index + 1) / guildLength) *
			Math.max(...dataset.map((data) => data.y))
		).toFixed(2);
		return `
      <text
        class="y-label"
        x=${startX - fontSize}
        y=${y}
        style="fill: black; line-height: 1.6; font-size: ${fontSize}"
      >${label}</text>
    `;
	});
};

// 그래프 그리기
const renderContainer = (width, height) => {
	const dataset = [
		{xLabel: '2024-01', x: 0, y: 24},
		{xLabel: '2024-02', x: 1, y: 72.25},
		{xLabel: '2024-03', x: 2, y: 37},
	];

	const fontSize = 18;

	const maximumLength = Math.max(
		...dataset.map((data) => data.y.toString().length)
	);
	const padding = (maximumLength + 2) * fontSize;

	return `
    <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      ${renderXAxis(width, height, padding)}
      ${renderYAxis(width, height, padding)}
      ${renderGuideLineX(width, height, 5, fontSize, padding)}
      ${renderGuideLineY(width, height, 5, fontSize, padding)}
      ${renderLinesAndPoints(width, height, dataset, padding)}
      ${renderXLabel(width, height, dataset, fontSize, padding)}
      ${renderYLabel(width, height, dataset, 5, fontSize, padding)}
    </svg>
  `;
};

document.querySelector('#lineChart').innerHTML = renderContainer(500, 500);

const xLabels = document.querySelectorAll('.x-label');
xLabels.forEach((xLabel) => {
	const x = xLabel.getAttribute('x') - xLabel.getBBox().width / 2;
	xLabel.setAttribute('x', x);
});

const yLabels = document.querySelectorAll('.y-label');
yLabels.forEach((yLabel) => {
	const x = yLabel.getAttribute('x') - yLabel.getBBox().width;
	yLabel.setAttribute('x', x);

	const y = Number(yLabel.getAttribute('y')) + yLabel.getBBox().height / 2;
	yLabel.setAttribute('y', y);
});
