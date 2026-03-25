function CourseListRow({ isHeader = false, textFirstCell = '', textSecondCell = null, id, isSelected = false, onChangeRow }) {
  const headerBg = { backgroundColor: 'rgba(222, 181, 181, 0.66)' };
  const rowBg = { backgroundColor: isSelected ? 'rgba(222, 181, 181, 0.66)' : 'rgba(205, 205, 205, 0.45)' };
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
      <td style={cellBorder}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onChangeRow(id, e.target.checked)}
        />
        {textFirstCell}
      </td>
      <td style={cellBorder}>{textSecondCell}</td>
    </tr>
  );
}

export default CourseListRow;
