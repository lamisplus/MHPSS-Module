package org.lamisplus.modules.mhpss;

import com.foreach.across.config.AcrossApplication;
import com.foreach.across.core.AcrossModule;
import com.foreach.across.core.context.configurer.ComponentScanConfigurer;
import org.lamisplus.modules.patient.PatientModule;
import org.lamisplus.modules.triage.TriageModule;

@AcrossApplication(
		modules = {
				PatientModule.NAME,
				TriageModule.NAME
		})
public class MhpssModule extends AcrossModule {
	public static final String NAME = "MhpssModule";
	public MhpssModule() {
		super ();
		addApplicationContextConfigurer (new ComponentScanConfigurer(
				getClass ().getPackage ().getName () + ".repository",
				getClass ().getPackage ().getName () + ".service",
				getClass ().getPackage ().getName () + ".controller"
		));
	}
	@Override
	public String getName() {
		return NAME;
	}
}
