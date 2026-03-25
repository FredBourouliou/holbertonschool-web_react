function CourseListRow({ isHeader = false, textFirstCell = '', textSecondCell = null }) {
  const headerBg = { backgroundColor: 'rgba(222, 181, 181, 0.66)' };
  const rowBg = { backgroundColor: 'rgba(205, 205, 205, 0.45)' };
  const cellBorder = { border: '1px solid #9ca3af', paddingLeft: '0.5rem' };

  if (isHeader) {
    if (textSecondCell === null) {
      return (
        <tr style={headerBg}>
          <th colSpan={2} style={cellBorder}>{textFirstCell}</th>
        </tr>
      );
    }
    return (
      <tr style={headerBg}>
        <th style={cellBorder}>{textFirstCell}</th>
        <th style={cellBorder}>{textSecondCell}</th>
      </tr>
    );
  }

  return (
    <tr style={rowBg}>
      <td style={cellBorder}>{textFirstCell}</td>
      <td style={cellBorder}>{textSecondCell}</td>
    </tr>
  );
}

export default CourseListRow;
