/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import dto.ChuckJoke;
import dto.CombinedJokes;
import dto.DadJoke;
import java.io.IOException;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.core.MediaType;
import utils.HttpUtils;

/**
 * REST Web Service
 *
 * @author root
 */
@Path("jokes")
public class JokeResource {
    private static final Gson GSON = new GsonBuilder().create();
    @Context
    private UriInfo context;

    /**
     * Creates a new instance of JokeResource
     */
    public JokeResource() {
    }
    @RolesAllowed({"user","admin"})
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public CombinedJokes getJokes() throws IOException {
        String chuck = HttpUtils.fetchData("https://api.chucknorris.io/jokes/random");
        String dad = HttpUtils.fetchData("https://icanhazdadjoke.com");
        ChuckJoke chuckJoke = GSON.fromJson(chuck, ChuckJoke.class);
        DadJoke dadJoke = GSON.fromJson(dad, DadJoke.class);
        CombinedJokes combined = new CombinedJokes(chuckJoke, dadJoke);
        return combined;
    }
}
