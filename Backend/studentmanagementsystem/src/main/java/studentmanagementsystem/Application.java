package studentmanagementsystem;

import io.micronaut.runtime.Micronaut;

public class Application {
	public static Database db;
    public static int current_year = 2024;
    public static int current_sem = 3;
	
    public static void main(String[] args) {
    	db = new Database();
        Micronaut.run(Application.class, args);
    }
}
