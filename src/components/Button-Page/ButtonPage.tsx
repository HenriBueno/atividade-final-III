import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';

interface ButtonPageProps {
  action: () => void;
  page: 'arrowback' | 'ArrowForward';
  disabled: boolean
}

function ButtonPage({ action, page, disabled }: ButtonPageProps) {
  return (
    <Box
      position={'absolute'}
      sx={{
        display: { xs: 'none', xl: 'flex' },
        left: page === 'arrowback' ? 225 : 'auto',
        right: page === 'ArrowForward' ? 210 : 'auto',
        position: 'fixed',
        height: '12%',
        marginBottom:'12.5%',
        '&:hover': {
          boxShadow: 'none',
          borderRadius:'50%',
          transition: 'box-shadow 0.5s ease',
          '&:hover': {
            boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.2)',
          },
        },
        
        
        
      }}
    >
      <IconButton aria-label={`page-${page}`} size="large" onClick={action} disabled={disabled}>
        {page === 'arrowback' ? (
          <ArrowBack
            aria-label={`page-${page}`}
            sx={{
              fontSize: '120px ',
              
              
            }}
          />
        ) : (
          <ArrowForward aria-label={`page-${page}`} sx={{ fontSize: '120px '}} />
        )}
      </IconButton>
    </Box>
  );
}

export default ButtonPage;
