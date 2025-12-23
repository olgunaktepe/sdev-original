import React from "react";
import { Row, Col } from "react-bootstrap";
import classNames from "classnames";

interface FAQsProps {
  rawFaqs: {
    id: number;
    question: string;
    answer: string;
    titleClass?: string;
    textClass?: string;
  }[];
  containerClass?: string;
}

/*
 * FAQs
 */
const FAQs = ({ rawFaqs, containerClass }: FAQsProps) => {
  return (
    <>
      <div className={`row ${containerClass}`}>
        <div className="col-lg-6">
          <div className="p-lg-2">
            {(rawFaqs.filter((item) => item.id % 2 !== 0) || []).map(
              (ques, index) => {
                return (
                  <React.Fragment key={index}>
                    <div className="faq-question-q-box">Q.</div>
                    <h4 className={classNames("faq-question", ques.titleClass)}>
                      {ques.question}
                    </h4>
                    <p
                      className={classNames("faq-answer mb-4", ques.textClass)}
                    >
                      {ques.answer}
                    </p>
                  </React.Fragment>
                );
              }
            )}
          </div>
        </div>
        <div className="col-lg-6">
          <div className="p-lg-2">
            {(rawFaqs.filter((item) => item.id % 2 === 0) || []).map(
              (ques, index) => {
                return (
                  <React.Fragment key={index}>
                    <div className="faq-question-q-box">Q.</div>
                    <h4 className={classNames("faq-question", ques.titleClass)}>
                      {ques.question}
                    </h4>
                    <p
                      className={classNames("faq-answer mb-4", ques.textClass)}
                    >
                      {ques.answer}
                    </p>
                  </React.Fragment>
                );
              }
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQs;
