import styled from 'styled-components'

const Input = styled.input`
  font-size: ${props => props.fontSize || '18px'};
  padding: ${props => props.padding || '10px'};
  margin: ${props => props.margin || '10px'};
  border: ${props => props.border || 'none'};
  width: ${props => props.width};
  border-radius: ${props => props.borderRadius || '3px'};
`;

const Select = styled.select`
   height: ${props => props.height || '38px'};
   width: ${props => props.width || '200px'};
   background: ${props => props.backgroundColor || 'white'};
   padding: ${props => props.padding || '20px'}
   color: gray;
   padding-left: 5px;
   font-size: 18px;
   margin:${props => props.margin || '10px 0px'};
   border-radius:${props => props.borderRadius || '20px'};
   border:${props => props.border || '1px solid #000'};
   option {
     color: black;
     background: white;
     display: flex;
     white-space: pre;
     min-height: 45px;
     padding: 100px ;
   }
 `;
export { Input, Select }