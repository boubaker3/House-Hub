import React from 'react'
import { Typography,Grid,Accordion, AccordionSummary , AccordionDetails   } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { faqsData } from './data/faqsData';
export default function Faq() {
  const [expanded, setExpanded] = React.useState<number | false>(false);

  const handleChange = (panel: number) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Grid container display='flex' justifyContent= 'center'  mt={6}>
    <Grid item xs={12} display="flex" justifyContent="center">
    <Typography variant="h2"   color="primary">
      our answers for your important questions    </Typography> 
      </Grid>

      <Grid item xs={10} md={6}  mt={6}>
      {faqsData.map((item, index) => (
        <Accordion sx={{backgroundColor:"#F6F6F6",'&:focus': { outline: 'none' }, '&:before': {
          display: 'none',
      },
        outline:'none',mt:4,boxShadow:0 ,borderRadius:"12px"}}
         expanded={expanded === index}
         onChange={handleChange(index)} key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon color='primary' />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography >{item.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{item.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      </Grid>
    </Grid>
  )
}
