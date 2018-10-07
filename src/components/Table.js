import styled from 'styled-components';
import { space, textAlign, border, borderColor } from 'styled-system';

const Table = styled.table`
  border: 1px solid #ccc;
  border-radius: 2px;
  ${space};
  width: 100%;
  border-spacing: 0px;
`;

const Thead = styled.thead`
  ${space};
`;

const Th = styled.th`
  ${space};
  ${border};
  ${borderColor};
`;

Th.defaultProps = {
  border: 1,
  borderColor: 'grayLighter',
  p: 2,
}

const Tr = styled.tr`
  ${border};
  ${borderColor};
`;

Tr.defaultProps = {
  border: 1,
  borderColor: 'gray'
}

const Td = styled.td`
  ${textAlign};
  ${border};
  ${borderColor};
  ${space};
`;

Td.defaultProps = {
  border: 1,
  borderColor: 'grayLighter',
  p: 2,
}

export {
  Thead,
  Th,
  Tr,
  Td
};

export default Table;
