package studentmanagementsystem;

import io.micronaut.runtime.Micronaut;

public class Application {
	public static Database db;
    public static String current_sem = "F24";
	
    public static void main(String[] args) {
    	db = new Database();
        Micronaut.run(Application.class, args);
    }
}
