import { BallTriangle } from 'react-loader-spinner';
import { LoaderWrap } from './LoaderWrap.styled';

export const Loader=()=>{
    return (
      <LoaderWrap>
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="red"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
        />
      </LoaderWrap>
    );
}