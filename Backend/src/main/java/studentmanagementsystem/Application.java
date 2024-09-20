package studentmanagementsystem;

import io.micronaut.runtime.Micronaut;

public class Application {
	public static Database db;
	
	
    public static void main(String[] args) {
    	db = new Database();
        Micronaut.run(Application.class, args);
    }
}
