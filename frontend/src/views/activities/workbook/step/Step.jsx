import style from "./Step.module.css";
import { MdExpandLess } from "react-icons/md";
import LazyLoad from "react-lazy-load";
export function Step(props) {
  const { info, setOpenInfo } = props;
  const { index, stepShow } = info;

  const {
    descriptionStep,
    imageExampleStep,
    codeStep,
    imageResultStep,
    notesStep,
  } = stepShow;

  return (
    <div className={`${style.containerOne} ${style.step}`}>
      <div className={style.summaryProject}>
        <button
          className={style.addTagsProject}
          onClick={() => setOpenInfo((prevState) => !prevState)}
        >
          <MdExpandLess size={30} />
        </button>
        <div className={style.wrapper}>
          <h2 className={style.typing_demo}>Contenido paso {index + 1}</h2>
        </div>
        {/* Description */}
        {descriptionStep ? (
          <div className={style.steps}>
            <h3>Descripción</h3>
            <p>{descriptionStep}</p>
          </div>
        ) : null}
        {/*     Image Example*/}
        {imageExampleStep ? (
          <div className={style.steps}>
            <h3>Imagen de referencia</h3>
            <LazyLoad className={style.img_preview}>
              <img
                className={style.image}
                src={imageExampleStep}
                alt="Imagen"
              />
            </LazyLoad>
          </div>
        ) : null}
        {/* Code */}
        {codeStep ? (
          <div className={style.steps}>
            <h3>Código</h3>
            <p>{codeStep}</p>
          </div>
        ) : null}

        {/*     Image expected result */}
        {imageResultStep ? (
          <div className={style.steps}>
            <h3>Resultado esperado</h3>
            <LazyLoad className={style.img_preview}>
              <img
                className={style.image}
                src={imageResultStep}
                alt="Resultado esperado"
              />
            </LazyLoad>
          </div>
        ) : null}
        {/* Notes */}
        {notesStep ? (
          <div className={style.steps}>
            <h3>Notas</h3>
            <p>{notesStep}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
