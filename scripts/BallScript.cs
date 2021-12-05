using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;


[RequireComponent(typeof(Rigidbody))]

public class BallScript : MonoBehaviour
{
    // Start is called before the first frame update

    [SerializeField]   // in order to change fields with in unity this is needed if the varible is set to private. if varible is not set to private but is to public it will display without this block.
    private Paddle Left_Paddle, Right_Paddle;

    [SerializeField]
    private Text WinnerText, Start_Game_Text;

    [SerializeField]
    private bool goal1 = true;

    Rigidbody rigidb;
   
    void Start()
    {
        Time.timeScale = 1;
        //rigidb = GetComponent<Rigidbody>();
        //rigidb.AddForce(new Vector3(4, 4, 0)), ForceMode.Impulse);
        if (rigidb)
        {
            rigidb.freezeRotation = true;
        }
        StartCoroutine("Waitforit");
    }

    // Update is called once per frame
    void Update()
    {
        
    }
    IEnumerator Waitforit()
    {
        Rigidbody rigidb = GetComponent<Rigidbody>();
        yield return new WaitForSeconds(1);
        if (rigidb)
        {
            if(goal1)
            {
                rigidb.AddForce(Random.Range(-9, -11), Random.Range(-3, -4), 0);
            }
            else
            {
                rigidb.AddForce(Random.Range(9, 11), Random.Range(3, 4), 0);
            }

            Debug.Log("ball is moving");
        }
    }

    private void OnTriggerEnter(Collider other)
    {
        if (other.name == "Player 2 Goal" || other.name == "Player 1 Goal")
        {

            if (other.name == "Player 2 Goal")
            {
                goal1 = false;
            }
            else
            {
                goal1 = true;
            }
            Rigidbody rigidb = GetComponent<Rigidbody>();
            this.transform.position = new Vector3(0, 0, 0);
            Left_Paddle.transform.position = new Vector3(-14, 0, 0);
            Right_Paddle.transform.position = new Vector3(14, 0, 0);
            rigidb.velocity = Vector3.zero;
            StartCoroutine("Waitforit");
        }

        if (Left_Paddle.Accessible_Score >= 5)
        {
            WinnerText.enabled = true;
            WinnerText.text = "Player 1 is the Winner";
            Time.timeScale = 0;
        }
        else if (Right_Paddle.Accessible_Score >= 5)
        {
            WinnerText.enabled = true;
            WinnerText.text = "Player 2 is the Winner";
            Time.timeScale = 0;
        }
    }

    public void Restart_Game()
    {
        SceneManager.LoadScene("GamePlay");

    }
    public void Menu()
    {
        SceneManager.LoadScene("Main Menu");
    }
}
