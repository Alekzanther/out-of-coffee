import Image from 'next/image';
import { useState } from 'react';
import styled, { css } from 'styled-components';

type GridItemProps = {
  id: string;
  fullName: string;
  url: string;
  images: { ORIGINAL: string };
  handleAddProduct: () => void;
};

type ProductsGridProps = {
  children: JSX.Element;
};
const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
`;
const StyledLink = styled.a`
  color: black;
  text-decoration: none;
  font-size: 12px;
`;
const StyledButton = styled.button`
  width: fit-content;
  padding: 6px 16px;
  border: none;
  background-color: #439b62;
  color: white;
  border-radius: 5px;
  box-shadow: 1px 1px 6px 0px #50655a;
  transition: 0.2s ease-in;
  flex: 1;
  margin: 16px;
  cursor: pointer;

  &:hover {
    box-shadow: 1px 1px 0px 0px #d7d7d7;
    background-color: #347e4e;
  }
`;

const StyledGridItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  box-shadow: -2px 1px 13px 0px #ddd9d9;
  border-radius: 10px;
  padding: 10px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const ImageWrapper = styled.div<{ loaded: boolean }>`
  ${(props) => css`
    position: relative;
    height: 150px;
    width: 100%;
    filter: ${!props.loaded ? 'blur(10px)' : 'blur(0px)'};
    background-color: ${!props.loaded ? '#e0e0e0' : 'transparent'};
    transition: filter 0.2s ease-in;
    margin: 10px;
    & > img {
      object-fit: contain;
      position: relative;
    }
  `}
`;

export const GridItem = (props: GridItemProps) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <StyledGridItem key={props.id}>
      <StyledLink href={'https://www.mathem.se' + props.url}>
        {props.fullName}
        <ImageWrapper loaded={loaded}>
          <Image
            src={`https:${props.images.ORIGINAL}`}
            alt={props.fullName}
            loading="lazy"
            onLoadingComplete={() => setLoaded(true)}
            fill
          />
        </ImageWrapper>
      </StyledLink>
      <StyledButton onClick={props.handleAddProduct}>
        Add to order
      </StyledButton>
    </StyledGridItem>
  );
};

export const ProductsGrid = (props: ProductsGridProps) => {
  return <StyledGrid>{props.children}</StyledGrid>;
};
