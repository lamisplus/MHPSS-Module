package org.lamisplus.modules.mhpss.installers;

import com.foreach.across.core.annotations.Installer;
import com.foreach.across.core.installers.AcrossLiquibaseInstaller;
import org.springframework.core.annotation.Order;

@Order(2)
@Installer(name = "updates-installer",
        description = "Updates the database for mhpss tables",
        version = 2)
public class UpdatesInstaller extends AcrossLiquibaseInstaller {
    public UpdatesInstaller() {
        super("classpath:installers/mhpss/schema/updates.xml");
    }
}
