package studentmanagementsystem;

import io.micronaut.core.optim.StaticOptimizations;
import io.micronaut.core.util.EnvironmentProperties;
import java.lang.Override;
import java.lang.String;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class EnvironmentPropertiesOptimizationLoader implements StaticOptimizations.Loader<EnvironmentProperties> {
  private void load0(Map<String, List<String>> env) {
    env.put("PATH", Arrays.asList("path"));
    env.put("HISTCONTROL", Arrays.asList("histcontrol"));
    env.put("XDG_DATA_DIRS", Arrays.asList("xdg.data.dirs", "xdg.data-dirs", "xdg-data.dirs", "xdg-data-dirs"));
    env.put("HISTSIZE", Arrays.asList("histsize"));
    env.put("BASH_FUNC_which%%", Arrays.asList("bash.func.which%%", "bash.func-which%%", "bash-func.which%%", "bash-func-which%%"));
    env.put("MOTD_SHOWN", Arrays.asList("motd.shown", "motd-shown"));
    env.put("TERM", Arrays.asList("term"));
    env.put("DBUS_SESSION_BUS_ADDRESS", Arrays.asList("dbus.session.bus.address", "dbus.session.bus-address", "dbus.session-bus.address", "dbus.session-bus-address", "dbus-session.bus.address", "dbus-session.bus-address", "dbus-session-bus.address", "dbus-session-bus-address"));
    env.put("LANG", Arrays.asList("lang"));
    env.put("XDG_SESSION_TYPE", Arrays.asList("xdg.session.type", "xdg.session-type", "xdg-session.type", "xdg-session-type"));
    env.put("XDG_SESSION_ID", Arrays.asList("xdg.session.id", "xdg.session-id", "xdg-session.id", "xdg-session-id"));
    env.put("NVM_INC", Arrays.asList("nvm.inc", "nvm-inc"));
    env.put("MAIL", Arrays.asList("mail"));
    env.put("STY", Arrays.asList("sty"));
    env.put("LOGNAME", Arrays.asList("logname"));
    env.put("which_declare", Arrays.asList("which.declare", "which-declare"));
    env.put("PWD", Arrays.asList("pwd"));
    env.put("XDG_SESSION_CLASS", Arrays.asList("xdg.session.class", "xdg.session-class", "xdg-session.class", "xdg-session-class"));
    env.put("NVM_CD_FLAGS", Arrays.asList("nvm.cd.flags", "nvm.cd-flags", "nvm-cd.flags", "nvm-cd-flags"));
    env.put("NVM_DIR", Arrays.asList("nvm.dir", "nvm-dir"));
    env.put("LESSOPEN", Arrays.asList("lessopen"));
    env.put("SHELL", Arrays.asList("shell"));
    env.put("SSH_TTY", Arrays.asList("ssh.tty", "ssh-tty"));
    env.put("SSH_CLIENT", Arrays.asList("ssh.client", "ssh-client"));
    env.put("OLDPWD", Arrays.asList("oldpwd"));
    env.put("USER", Arrays.asList("user"));
    env.put("WINDOW", Arrays.asList("window"));
    env.put("SSH_CONNECTION", Arrays.asList("ssh.connection", "ssh-connection"));
    env.put("HOSTNAME", Arrays.asList("hostname"));
    env.put("TERMCAP", Arrays.asList("termcap"));
    env.put("XDG_RUNTIME_DIR", Arrays.asList("xdg.runtime.dir", "xdg.runtime-dir", "xdg-runtime.dir", "xdg-runtime-dir"));
    env.put("LS_COLORS", Arrays.asList("ls.colors", "ls-colors"));
    env.put("NVM_BIN", Arrays.asList("nvm.bin", "nvm-bin"));
    env.put("HOME", Arrays.asList("home"));
    env.put("SHLVL", Arrays.asList("shlvl"));
  }

  @Override
  public EnvironmentProperties load() {
    Map<String, List<String>> env = new HashMap<String, List<String>>();
    load0(env);
    return EnvironmentProperties.of(env);
  }
}
