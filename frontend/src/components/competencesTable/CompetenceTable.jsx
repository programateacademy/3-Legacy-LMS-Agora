import React from "react";
import "./CompetencesTable.css";


export function CompetencesTable(props) {
	const {competencesState}=props;
	return (
		<div className="contenedor">
			{competencesState.map((item)=>(
			<label class="accordion-wrapper">
				<input type="checkbox" class="accordion" hidden />
				<div class="title">
					<div className="c1">
						<h1>{item.identifierCompetences}</h1>
					</div>
					<div className="descripcion">
						<strong className="">{item.nameCompetences}</strong>
					</div>
					<svg viewBox="0 0 256 512" width="12" title="angle-right" class="side-icon" fill="white">
						<path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" />
					</svg>
					<svg viewBox="0 0 320 512" height="24" title="angle-down" class="down-icon" fill="white">
						<path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" />
					</svg>
				</div>
				<div class="content">
					<section id="main">
						<div id="tabs">
							<span class="diana" id="uno"></span>
							<a href="#uno" class="tab-e">Nivel 1</a>
							<span class="diana" id="dos"></span>
							<a href="#dos" class="tab-e">Nivel 2</a>
							<span class="diana" id="tres"></span>
							<a href="#tres" class="tab-e">Nivel 3</a>

							<div id="pnl_1">
								<div className="text">
									<h2>Descripción</h2>
									<p>{item.levelOne.actions1}</p>
								</div>
								<div className="text">
									<h2>Criterios de evaluación</h2>
									<p>{item.levelOne.evaluationCriteria1}</p>
								</div>
							</div>

							<div id="pnl_2">
								<div className="text">
									<h2>Descripción</h2>
									<p>{item.levelTwo.actions2}</p>
								</div>
								<div className="text">
									<h2>Criterios de evaluación</h2>
									<p>{item.levelTwo.evaluationCriteria2}</p>
								</div>
							</div>

							<div id="pnl_3">
								<div className="text">
									<h2>Descripción</h2>
									<p>{item.levelThree.actions3}</p>
								</div>
								<div className="text">
									<h2>Criterios de evaluación</h2>
									<p>{item.levelThree.evaluationCriteria3}</p>
								</div>
							</div>
						</div>
					</section>
				</div>
			</label>))}
			
		</div>
	);
};
