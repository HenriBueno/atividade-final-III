import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { IconButton } from '@mui/material';

interface ButtonPageSmallProps {
  action: () => void;
  page: 'arrowback' | 'ArrowForward';
  disabled: boolean
}

function ButtonPageSmall({ action, page, disabled }: ButtonPageSmallProps) {
  return (

      <IconButton aria-label={`page-${page}`} size="large" onClick={action} disabled={disabled}>
        {page === 'arrowback' ? (
          <ArrowBack aria-label={`page-${page}`} fontSize="large" sx={{ fontSize: '50px ' }} />
        ) : (
          <ArrowForward aria-label={`page-${page}`} fontSize="large" sx={{ fontSize: '50px ' }} />
        )}
      </IconButton>

  );
}

export default ButtonPageSmall;
