import React from "react";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

const ParseCkeditor = () => {
  const { preambleData } = useSelector((state) => state.preambleData);
  const { SubtitlesAll } = useSelector((state) => state?.SubtitlesAll);
  const { SubtitlesInputsAll } = useSelector(
    (state) => state?.SubtitlesInputsAll
  );
  return (
    <div>
      <div className="subtitleContainer  mb-3">
        <div>
          {typeof preambleData?.description === "string" // need to use parse
            ? parse(preambleData?.description)
            : null}
        </div>
      </div>

      <div className="subTitles_Container mb-3 ">
        {SubtitlesAll?.map((item, index) => (
          <div className="subtitleContainer  mb-3" key={index}>
            <h6>{item?.subtitle}</h6>

            {SubtitlesInputsAll?.content?.map(
              (item2, index) =>
                item.id === item2?.generalSubSection?.id && (
                  //parsing text here
                  <div key={index}>{parse(item2?.description)}</div>
                )
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParseCkeditor;
