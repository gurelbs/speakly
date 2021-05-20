import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function Documentation() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="page bg-gif default-font">
        <div className="container">
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>תרגום</Typography>
          <Typography className={classes.secondaryHeading}>"איך אומרים שלום עולם באנגלית"</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          ניתן לתרגם מילים משפה לשפה בפורמט: תרגם X ל-Y או: איך אומרים X ב-Y
            <br />
            לדוגמה:
            <br />
            "תרגם בוקר טוב לצרפתית"
            <br />
            "איך אומרים מה שלומך ביפנית"
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>חדשות</Typography>
          <Typography className={classes.secondaryHeading}>
            "חדשות"
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography>
            ניתן לבקש מרותם להקריא את כותרות החדשות מהימים האחרונים על ידי הפקודה "חדשות" או "חדשות היום"
        </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}>המרת מטבעות</Typography>
          <Typography className={classes.secondaryHeading}>
            "שלוש מאות חמישים שקל ללירה סטרלינג"
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            ניתן להמיר מטבעות באופן אוטומטי על ידי פקודה בפורמט: X,Y ל-Z
            <br />
            לדוגמה:
            <br />
            "שקל לדולר" 
            <br />
            "100 רופי ללירה מצרית"
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>שאלות חופשיות</Typography>
          <Typography className={classes.secondaryHeading}>
          "מה זה זיהוי קולי?"
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           ניתן לשאול שאלות חופשיות בפורמטים שונים.
           <br />
           לדוגמה:
           <br />
           "מה המרחק לירח"
           <br />
           "כמה אנשים יש בעולם"
           <br />
           "מי זה אלון מאסק"
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5bh-content"
          id="panel5bh-header"
        >
          <Typography className={classes.heading}>מזג אוויר</Typography>
          <Typography className={classes.secondaryHeading}>
          "מה מזג האוויר בהונולולו"
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           ניתן לבדוק את מזג האוויר במקומות בעולם
           <br />
           לדוגמה:
           <br />
           "מה מזג האוויר בתל אביב"
           <br />
           "מה מזג האוויר בפריז"
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel6bh-content"
          id="panel6bh-header"
        >
          <Typography className={classes.heading}>חיפוש בגוגל</Typography>
          <Typography className={classes.secondaryHeading}>
          "חיפוש בגוגל אופניים יד שניה"
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           ניתן לחפש בגוגל על ידי פקודה בפורמט: "חיפוש בגוגל X"
           <br />
           לדוגמה:
           <br />
           "חיפוש בגוגל איך נראה הדגל של ארגנטינה"
           <br />
           "חיפוש בגוגל מי הזוכה בהישרדות 2016"
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel7bh-content"
          id="panel7bh-header"
        >
          <Typography className={classes.heading}>חיפוש ביוטיוב</Typography>
          <Typography className={classes.secondaryHeading}>
          "חפש ביוטיוב שירים מרגיעים"
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           ניתן לחפש ביוטיוב באופן אוטומטי על ידי פקודה בפורמט: "חיפוש ביוטיוב X"
           <br />
           לדוגמה:
           <br />
           "חיפוש ביוטיוב סרטונים מצחיקים"
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel8bh-content"
          id="panel8bh-header"
        >
          <Typography className={classes.heading}>חיפוש בויקיפדיה</Typography>
          <Typography className={classes.secondaryHeading}>
          "חיפוש בויקיפדיה javascript"
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           ניתן לפתוח דף של ערך ספציפי בויקיפדיה על ידי פקודה בפורמט: "חיפוש בויקיפדיה X"
           <br />
           לדוגמה:
           <br />
           "חיפוש בויקיפדיה לוויתן כחול"
           <br />
           "חיפוש בויקיפדיה חברת google "
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel9bh-content"
          id="panel9bh-header"
        >
          <Typography className={classes.heading}>הפעלת רדיו</Typography>
          <Typography className={classes.secondaryHeading}>
          "הפעלת רדיו"
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           ניתן לפתוח רדיו מקומי על ידי הפקודה "הפעלת רדיו"
          </Typography>
        </AccordionDetails>
      </Accordion>
        </div>
    </div>
  );
}